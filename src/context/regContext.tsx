import { useState, useContext, createContext, useMemo } from "react";

interface Genres {
  action?: boolean;
  comedy?: boolean;
  drama?: boolean;
  horror?: boolean;
  romance?: boolean;
  thriller?: boolean;
  sciFI?: boolean;
}

interface FormData {
  address: string;
  userName: string;
  avatarUrl?: string;
  aviFileData?: File;
  genres?: Genres;
}

interface FormContextProps {
  formData: FormData;
  aviFileData?: File;
  updateFormData: (data: Partial<FormData>) => void;
  updateAviFileData: (newData: unknown) => void;
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
    avatarUrl: "",
  });
  const [aviFileData, setAviFileData] = useState<File | undefined>(undefined);

  const updateAviFileData = (newData: File) => {
    // Replace `any` with the actual type of your AVI file data
    setAviFileData(newData);
  };

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
    return { formData, aviFileData, updateFormData, updateAviFileData };
  }, [formData, aviFileData]);

  return <FormContext.Provider value={value}>{children}</FormContext.Provider>;
};
