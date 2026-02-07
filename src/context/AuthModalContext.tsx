import React, { createContext, useContext, useState, ReactNode } from "react";

interface AuthModalContextType {
    showSignupModal: boolean;
    setShowSignupModal: React.Dispatch<React.SetStateAction<boolean>>;
    openSignupModal: () => void;
    closeSignupModal: () => void;
}

const AuthModalContext = createContext<AuthModalContextType | undefined>(undefined);

export const AuthModalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [showSignupModal, setShowSignupModal] = useState<boolean>(false);

    const openSignupModal = () => setShowSignupModal(true);
    const closeSignupModal = () => setShowSignupModal(false);

    return (
        <AuthModalContext.Provider
            value={{
                showSignupModal,
                setShowSignupModal,
                openSignupModal,
                closeSignupModal,
            }}
        >
            {children}
        </AuthModalContext.Provider>
    );
};

export const useAuthModal = (): AuthModalContextType => {
    const context = useContext(AuthModalContext);
    if (!context) {
        throw new Error("useAuthModal must be used within an AuthModalProvider");
    }
    return context;
};
