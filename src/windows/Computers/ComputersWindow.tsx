import { styled } from "styled-components";
import { Window } from "../../components/Window/Window";
import { useEffect, useState } from "react";
import { ComputersApi } from "../../core/api/ComputersApi";
import { useUser } from "../../context/user-context";

interface ComputersWindowProps {
  isOpen?: boolean;
  isVisible?: boolean;
  onClose?: () => void;
  onMinimize?: () => void;
}

export const ComputersWindow: React.FC<ComputersWindowProps> = ({
  onClose,
  onMinimize,
  isOpen,
  isVisible,
}) => {
  const [user] = useUser();
  const [computers, setComputers] = useState<IComputer[]>([]);

  useEffect(() => {
    fetchComputers();
  }, []);

  const fetchComputers = async () => {
    try {
      const computers = await ComputersApi.listComputers(user.id);
      setComputers(computers);
    } catch (err) {
      // TODO alert user
    }
  };

  return (
    <>
      {isOpen && (
        <Window
          title="Meus Computadores"
          onClose={onClose}
          onMinimize={onMinimize}
          style={{ visibility: isVisible ? "unset" : "hidden" }}
        >
          <Computers>
            {computers.length === 0 && (
              <NoComputers>Sem computadores</NoComputers>
            )}
            {computers.map((computer) => (
              <Computer></Computer>
            ))}
          </Computers>
        </Window>
      )}
    </>
  );
};

const NoComputers = styled.span`
  font-size: 14px;
  font-weight: 500;
  font-style: italic;
  padding: 40px 0;
`;

const Computers = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 12px;
`;

const Computer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;
