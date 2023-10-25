import { useState, useContext, createContext, useMemo } from "react";

interface FormData {
  address: string;
  userName: string;
}

interface FormContextProps {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
}

interface FormProviderProps {
  children: React.ReactNode;
}

const FormContext = createContext<FormContextProps | undefined>(undefined);

export const useFormData = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error("useFormData must be used within a FormProvider");
  }
  return context;
};

export const FormProvider: React.FC<FormProviderProps> = ({ children }) => {
  const [formData, setFormData] = useState<FormData>({
    address: "",
    userName: "",
  });

  const value = useMemo(() => {
    const updateFormData = (data: Partial<FormData> | (() => FormData)) => {
      if (typeof data === "function") {
        setFormData((prevData) => ({
          ...prevData,
          ...data(),
        }));
      } else {
        setFormData((prevData) => ({
          ...prevData,
          ...data,
        }));
      }
    };
    return { formData, updateFormData };
  }, [formData]);

  return <FormContext.Provider value={value}>{children}</FormContext.Provider>;
};
