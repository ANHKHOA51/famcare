import fs from 'fs';

const p = './src/components/scanner/ResultState.tsx';
let txt = fs.readFileSync(p, 'utf8');

// 1. Add Alert Dialog import
txt = txt.replace('import { toast } from "sonner";', 
`import { toast } from "sonner";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";`);

// 2. Add pendingMed state and update save logic
txt = txt.replace('const [editValue, setEditValue] = useState<string>("");',
`const [editValue, setEditValue] = useState<string>("");
  const [pendingMed, setPendingMed] = useState<{ med: any, index: number, finalName: string } | null>(null);`);

txt = txt.replace(/const handleSaveToCabinet = async \([\s\S]*?setIsSaving\(false\);\n    }\n  };/,
`const handleSaveToCabinet = (med: any, index: number, showWarning: boolean) => {
    const finalName = editedMedications[index] || med.name;
    if (showWarning) {
      setPendingMed({ med, index, finalName });
      return;
    }
    confirmSaveToCabinet(med, index, finalName);
  };

  const confirmSaveToCabinet = async (med: any, index: number, finalName: string) => {
    if (!selectedMember) {
      toast.error("Vui lòng chọn thành viên");
      return;
    }

    setIsSaving(true);
    try {
      const resp = await fetch("/api/cabinet/save", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          Authorization: \`Bearer \${token}\` 
        },
        body: JSON.stringify({
          name: finalName,
          dosage: med.dosage,
          instructions: med.instructions,
          diagnosis: result.diagnosis,
          symptoms_treated: med.suggested_symptoms?.join(", "),
          prescriptionCode,
          hospitalName,
          isShared,
          familyMemberId: selectedMember
        })
      });

      if (resp.ok) {
        setSavedMedications(prev => [...prev, finalName]);
        toast.success(\`Đã lưu \${finalName} vào tủ thuốc\`);
      } else {
        toast.error("Lỗi khi lưu thuốc");
      }
    } catch (e) {
      toast.error("Lỗi kết nối");
    } finally {
      setIsSaving(false);
      setPendingMed(null);
    }
  };`);

// 3. Fix Input styling jumping
txt = txt.replace(/className="h-8 max-w-\[200px\] font-bold text-lg px-2"/g, `className="w-full h-auto py-1 font-bold text-lg px-2 shadow-none border-dashed border-primary/50"`);

// 4. Update the Button onClick to pass showWarning
txt = txt.replace(/onClick=\{\(\) => handleSaveToCabinet\(med, i\)\}/g, `onClick={() => handleSaveToCabinet(med, i, showWarning)}`);

// 5. Remove Nutrition Plan section entirely 
txt = txt.replace(/\{\/\* Nutrition Plan \*\/\}\s*<div className="grid md:grid-cols-2 gap-6">[\s\S]*?(?=\{\/\* Action CTA \*\/\})/g, '');

// 6. Append AlertDialog to the end of return statement
txt = txt.replace(/<\/div>\n  \);\n\};\n\nexport default ResultState;/, 
`      <AlertDialog open={!!pendingMed} onOpenChange={(o) => { if(!o) setPendingMed(null); }}>
        <AlertDialogContent className="rounded-2xl border-destructive/20 animate-in fade-in zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out data-[state=closed]:zoom-out-95">
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2 text-destructive">
              <AlertTriangle className="h-5 w-5" /> Cảnh báo nhận diện
            </AlertDialogTitle>
            <AlertDialogDescription className="text-on-surface-variant text-[15px] pt-2">
              AI của FamCare nhận diện tên thuốc <strong>{pendingMed?.finalName}</strong> với độ tin cậy thấp. 
              Bạn có muốn kiểm tra và sửa lại tên thuốc không?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="mt-4 gap-2 border-t pt-4">
            <AlertDialogCancel className="rounded-xl border-border bg-surface-1 hover:bg-surface-2 sm:max-w-none m-0">Sửa lại</AlertDialogCancel>
            <AlertDialogAction 
              onClick={() => {
                if(pendingMed) confirmSaveToCabinet(pendingMed.med, pendingMed.index, pendingMed.finalName);
              }}
              className="rounded-xl bg-destructive text-destructive-foreground hover:bg-destructive/90 m-0"
            >
              Vẫn lưu nguyên
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ResultState;`);

fs.writeFileSync(p, txt);
console.log('ResultState.tsx patched successfully');
