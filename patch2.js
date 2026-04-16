import fs from 'fs';

const p = './src/components/scanner/ResultState.tsx';
let txt = fs.readFileSync(p, 'utf8');

// replace handleSaveToCabinet
const target = `  const handleSaveToCabinet = async (med: any, index: number) => {
    if (!selectedMember) {
      toast.error("Vui lòng chọn thành viên");
      return;
    }

    const finalName = editedMedications[index] || med.name;

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
    }
  };`;

const replacement = `  const handleSaveToCabinet = (med: any, index: number, showWarning: boolean) => {
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
  };`;

fs.writeFileSync(p, txt.replace(target, replacement));
console.log('patched resultstate');
