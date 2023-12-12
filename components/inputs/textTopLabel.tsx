import { Input, Button, Select, SelectItem } from "@nextui-org/react";

interface TextInputTopLabelProps {
  label: string;
  onChange: (value: string) => void;
  value: string; // Add this line to include the value property
}

function TextInputTopLabel({ label, onChange, value }: TextInputTopLabelProps) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    onChange(newValue);
  };

  return (
    <>
      <Input
        type="text"
        onChange={handleChange}
        value={value}
        label={label}
        placeholder={`Enter ${label}`}
        labelPlacement="outside"
      />
    </>
  );
}

export default TextInputTopLabel;
