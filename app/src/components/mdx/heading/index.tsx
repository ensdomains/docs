'use client';
import { useInView } from 'framer-motion';
import { FC, PropsWithChildren, useEffect, useRef } from 'react';

import { useSectionStore } from '@/components/SectionProvider';
import { cx } from '@/lib/cx';
import { remToPx } from '@/lib/remToPx';

import { Anchor } from './Anchor';
import { Eyebrow } from './Eyebrow';

export const Heading: FC<
    PropsWithChildren & {
        level?: 2 | 3 | 4 | 5 | 6;
        id: string;
        tag?: string;
        label?: string;
        anchor?: boolean;
        className?: string;
    }
> = ({ level = 2, children, id, tag, label, anchor = true, ...properties }) => {
    const Component = `h${level}` as any as FC<
        PropsWithChildren & { ref: any; id: any; className: any }
    >;
    const reference = useRef<any>();
    const registerHeading = useSectionStore((s) => s.registerHeading) as (_v: {
        id: string;
        ref: any;
        offsetRem: number;
    }) => void;

    const inView = useInView(reference, {
        margin: `${remToPx(-3.5)}px 0px 0px 0px`,
        amount: 'all',
    });

    useEffect(() => {
        if (level === 2) {
            registerHeading({
                id,
                ref: reference,
                offsetRem: tag || label ? 8 : 6,
            });
        }
    });

    return (
        <>
            <Component
                ref={reference}
                id={anchor ? id : undefined}
                className={cx(
                    properties.className,
                    'mt-8 scroll-mt-32',
                    'flex justify-between items-center w-full'
                )}
                children={
                    (
                        <>
                            {anchor ? (
                                <Anchor id={id} inView={inView}>
                                    {children}
                                </Anchor>
                            ) : (
                                children
                            )}
                            <div>
                                <Eyebrow tag={tag} label={label} />
                            </div>
                        </>
                    ) as any
                }
                {...properties}
            />
        </>
    );
};
