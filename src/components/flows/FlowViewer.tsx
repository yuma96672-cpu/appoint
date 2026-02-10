"use client";

import { useState } from "react";
import Image from "next/image";

type FlowConfig = {
    title: string;
    comicImages: string[];
    question: string;
    yesLabel: string;
    noLabel: string;
    timerexUrl: string;
    noMessageTitle: string;
    noMessageBody: string;
};

export default function FlowViewer({ config }: { config: FlowConfig }) {
    const [step, setStep] = useState(0); // 0 to comicImages.length - 1: Images, length: Question, length + 1: End (No)

    const totalImages = config.comicImages.length;
    const isImageStep = step < totalImages;
    const isQuestionStep = step === totalImages;
    const isEndStep = step === totalImages + 1;

    const handleNext = () => {
        setStep((prev) => prev + 1);
    };

    const handleBack = () => {
        if (step > 0) {
            setStep((prev) => prev - 1);
        }
    };

    const handleYes = () => {
        window.location.href = config.timerexUrl;
    };

    const handleNo = () => {
        setStep(totalImages + 1);
    };

    if (totalImages === 0 && step === 0) {
        // Special case: No images
        return (
            <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-50">
                <h1 className="text-xl font-bold mb-4">{config.title}</h1>
                <div className="bg-white p-8 rounded-lg shadow-md flex flex-col items-center max-w-md w-full">
                    <p className="text-gray-500 mb-6">画像準備中</p>
                    <button
                        onClick={handleNext}
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded transition-colors"
                    >
                        次へ
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col max-w-md mx-auto shadow-xl bg-white min-h-[100dvh]">
            {/* Header */}
            <header className="p-4 border-b bg-white flex justify-between items-center sticky top-0 z-10">
                <h1 className="font-bold text-gray-800 truncate">{config.title}</h1>
                <div className="text-sm text-gray-500">
                    {isImageStep ? `${step + 1} / ${totalImages}` : ""}
                </div>
            </header>

            {/* Content */}
            <main className="flex-1 overflow-y-auto p-4 flex flex-col items-center justify-center">
                {isImageStep && (
                    <div className="relative w-full h-full flex flex-col items-center">
                        <div className="relative w-full aspect-[3/4] mb-4">
                            <Image
                                src={config.comicImages[step]}
                                fill
                                alt={`Comic page ${step + 1}`}
                                className="object-contain"
                                priority={step === 0}
                            />
                        </div>
                    </div>
                )}

                {isQuestionStep && (
                    <div className="w-full h-full flex flex-col items-center justify-center text-center animate-in fade-in duration-300">
                        <h2 className="text-2xl font-bold mb-8 text-gray-800">{config.question}</h2>
                        <div className="flex flex-col w-full gap-4 max-w-xs">
                            <button
                                onClick={handleYes}
                                className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-4 px-6 rounded-lg shadow-lg text-lg transition-transform active:scale-95"
                            >
                                {config.yesLabel}
                            </button>
                            <button
                                onClick={handleNo}
                                className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-4 px-6 rounded-lg text-lg transition-colors"
                            >
                                {config.noLabel}
                            </button>
                        </div>
                    </div>
                )}

                {isEndStep && (
                    <div className="text-center animate-in fade-in duration-300">
                        <h2 className="text-xl font-bold mb-4 text-gray-800">{config.noMessageTitle}</h2>
                        <p className="text-gray-600 mb-8">{config.noMessageBody}</p>
                    </div>
                )}
            </main>

            {/* Footer / Controls */}
            {isImageStep && (
                <footer className="p-4 border-t bg-white flex gap-4 sticky bottom-0">
                    <button
                        onClick={handleBack}
                        disabled={step === 0}
                        className={`flex-1 py-3 px-4 rounded font-bold border ${step === 0
                                ? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
                                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                            }`}
                    >
                        戻る
                    </button>
                    <button
                        onClick={handleNext}
                        className="flex-1 py-3 px-4 rounded font-bold bg-blue-500 text-white hover:bg-blue-600 shadow-md"
                    >
                        次へ
                    </button>
                </footer>
            )}
        </div>
    );
}
