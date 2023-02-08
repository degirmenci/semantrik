import Image from "next/image";
import { useRouter } from "next/dist/client/router";
import { useState } from "react";
import { QuestionMarkCircleIcon } from "@heroicons/react/24/outline";
import { FaqModal } from "./FaqModal";

function Header() {
    const router = useRouter();
    const [isFaqModalOpen, setIsFaqModalOpen] = useState(false);

    function toggleFaq() {
        setIsFaqModalOpen(!isFaqModalOpen);
    }

    return (
        <div>
            <header className="grid grid-cols-2 py-5 px-5 h-28 min-h-full">
                <div onClick={() => router.push("/")} className="relative cursor-pointer">
                    <Image src='/semantrik.png'
                    fill
                    alt="airbnb-image"
                    className="object-contain object-left"
                    />
                </div>

                <div className="flex items-center justify-end">
                    <QuestionMarkCircleIcon onClick={toggleFaq}
                    className="h-8 cursor-pointer" />
                </div>

            </header>

            <FaqModal isOpen={isFaqModalOpen} handleClose={() => setIsFaqModalOpen(false)} />
        </div>
    )
}    

export default Header