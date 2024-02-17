/* eslint-disable jsx-a11y/no-static-element-interactions */
'use client';

import { useState } from 'react';

import { Button } from '@/components/Button';

const width = 800;
const height = (9 / 16) * 800;

export const SmartContractMap = () => {
    const [[x, y], setLocation] = useState([0, 0]);
    const [[dragX, dragY], setStartLocation] = useState([0, 0]);
    const [dragging, setDragging] = useState(false);

    return (
        <div
            className="card1 relative aspect-video overflow-hidden px-6"
            style={{ width, height }}
            onMouseDown={(event) => {
                setDragging(true);
                setStartLocation([event.clientX - x, event.clientY - y]);
            }}
            onMouseUp={() => setDragging(false)}
            onMouseLeave={() => setDragging(false)}
            onMouseMove={(event) => {
                if (dragging) {
                    setLocation([
                        Math.max(Math.min(event.clientX - dragX, 150), -200),
                        Math.max(Math.min(event.clientY - dragY, 150), -600),
                    ]);
                }
            }}
            onScrollCapture={(event) => {
                const x = event.detail;

                console.log(x);
            }}
        >
            <div
                className="absolute size-[800px] rounded-lg border border-ens-light-border p-4 dark:border-ens-dark-border"
                style={{ left: x, top: y }}
            >
                <img
                    src="/content/learn/contracts.svg"
                    alt=""
                    className="w-[800px] select-none"
                    draggable={false}
                    onDragStart={(event) => event.preventDefault()}
                />
                <div className="grid grid-cols-3 gap-4">
                    <div className="card1 flex flex-col p-3">
                        <div className="p-2">
                            <div className="text-xl leading-4">addr</div>
                            <div className="text-lg font-bold leading-4">
                                .reverse
                            </div>
                        </div>
                        <Button
                            variant="primary"
                            onClick={() => {
                                console.log('hi');
                            }}
                        >
                            View on Explorer
                        </Button>
                    </div>
                    <div className="card1 flex flex-col p-3">
                        <div className="p-2">
                            <div className="text-xl leading-4">registrar</div>
                            <div className="text-lg font-bold leading-4">
                                .ens.eth
                            </div>
                        </div>
                        <Button
                            variant="primary"
                            onClick={() => {
                                console.log('hi');
                            }}
                        >
                            View on Explorer
                        </Button>
                    </div>
                    <div className="card1 flex flex-col p-3">
                        <div className="p-2">
                            <div className="text-xl leading-4">
                                dnsregistrar
                            </div>
                            <div className="text-lg font-bold leading-4">
                                .ens.eth
                            </div>
                        </div>
                        <Button
                            variant="primary"
                            onClick={() => {
                                console.log('hi');
                            }}
                        >
                            View on Explorer
                        </Button>
                    </div>
                    <div className="card1 flex flex-col p-3">
                        <div className="p-2">
                            <div className="text-xl leading-4">root</div>
                            <div className="text-lg font-bold leading-4">
                                .ens.eth
                            </div>
                        </div>
                        <Button
                            variant="primary"
                            onClick={() => {
                                console.log('hi');
                            }}
                        >
                            View on Explorer
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};
