import { useRef, useState } from "react";
import { MainContainer, Modal, Button } from "@/components";
import { Inter } from "next/font/google";
import { AnimatePresence } from "framer-motion";
import { useOnClickOutside } from "usehooks-ts";
import { useLocalContextState } from "@/shared";
import { AiOutlineCheck } from "react-icons/ai";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const $ref = useRef(null);
  const [inputKey, setInputKey] = useState<string | null>("");
  const [openModal, setOpenModal] = useState<boolean>(false);
  const { setApiKey } = useLocalContextState((state) => state);

  const handleOpenModal = () => setOpenModal((prev) => !prev);
  useOnClickOutside($ref, () => setOpenModal(false));

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setInputKey(e.target.value);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputKey) setApiKey(inputKey);
    setOpenModal(false);
  };

  return (
    <main className={`flex min-h-screen flex-row relative ${inter.className}`}>
      <MainContainer onModalHandle={handleOpenModal} />
      <AnimatePresence initial={false} mode="wait" onExitComplete={() => null}>
        {openModal && (
          <Modal handleClose={() => setOpenModal(false)}>
            <div
              ref={$ref}
              className="inline-block w-full align-bottom bg-white dark:bg-zinc-900 rounded-lg px-4 pt-5 pb-4 text-left shadow-xl transform transition-all sm:my-8 sm:align-middle sm:p-6 overflow-hidden sm:max-w-sm opacity-100 translate-y-0 sm:scale-100"
            >
              <p className="text-xs font-light">
                Your API Key is stored locally on your browser and never sent
                anywhere else.
              </p>

              <form
                className="my-4 flex flex-col justify-center items-center"
                onSubmit={onSubmit}
              >
                <input
                  type="text"
                  title="ApiKey"
                  aria-label="ApiKey"
                  placeholder="sk-xxxxxxxxxxxxxxxxxxxx"
                  className="w-full text-black rounded-md py-2 px-4 border-solid border-2 border-black mb-4"
                  onChange={onChange}
                />

                <Button
                  type="submit"
                  icon={<AiOutlineCheck color="#ffffff" size={20} />}
                >
                  Save API Key
                </Button>
              </form>
            </div>
          </Modal>
        )}
      </AnimatePresence>
    </main>
  );
}
