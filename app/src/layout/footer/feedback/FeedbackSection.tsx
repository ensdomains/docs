'use client';

import { FormEventHandler, ForwardedRef, forwardRef, useState } from 'react';

export const CheckIcon = (properties) => {
    return (
        <svg viewBox="0 0 20 20" aria-hidden="true" {...properties}>
            <circle cx="10" cy="10" r="10" strokeWidth="0" />
            <path
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="m6.75 10.813 2.438 2.437c1.218-4.469 4.062-6.5 4.062-6.5"
            />
        </svg>
    );
};

function FeedbackButton(properties) {
    return (
        <button
            onClick={async () => {
                const response = properties['data-response']
                    .replace('yes', 'Positive Page Rating')
                    .replace('no', 'Negative Page Rating');

                await fetch('https://ens.v3x.report/api/event', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        name: response,
                        url: window.location.href,
                        domain: 'docs.ens.domains',
                    }),
                });
            }}
            type="submit"
            className="dark:ens-dark-blue-dim bg-ens-light-blue-surface px-3 text-sm font-medium text-ens-light-blue-dim transition dark:bg-ens-dark-blue-surface"
            {...properties}
        />
    );
}
const FeedbackForm = forwardRef(
    (
        { onSubmit }: { onSubmit: FormEventHandler<HTMLFormElement> },
        reference: ForwardedRef<HTMLFormElement>
    ) => {
        return (
            <form
                ref={reference}
                onSubmit={onSubmit}
                className="flex items-center justify-center gap-6 text-ens-light-text-primary dark:text-ens-dark-text-primary md:justify-start "
            >
                <p className="text-sm font-bold">Was this page helpful?</p>
                <div className="group grid h-8 grid-cols-[1fr,1px,1fr] overflow-hidden rounded-xl">
                    <FeedbackButton data-response="yes">Yes</FeedbackButton>
                    <div className="" />
                    <FeedbackButton data-response="no">No</FeedbackButton>
                </div>
            </form>
        );
    }
);

const FeedbackThanks = forwardRef(
    (_properties, reference: ForwardedRef<HTMLDivElement>) => {
        return (
            <div
                ref={reference}
                className="flex justify-center md:justify-start"
            >
                <div className="flex h-fit items-center gap-1.5 overflow-hidden rounded-lg text-sm">
                    <CheckIcon className="dark:fill-ens-200/20 dark:stroke-ens-200 size-4 flex-none fill-ens-light-blue-primary stroke-white" />
                    <div className="flex gap-2 leading-5 text-ens-light-text-primary dark:text-ens-dark-text-primary">
                        <span>Thanks for your feedback!</span>
                        <span>
                            (
                            <a
                                href="mailto:info@ens.domains"
                                className="underline"
                            >
                                I have more feedback
                            </a>
                            )
                        </span>
                    </div>
                </div>
            </div>
        );
    }
);

export const Feedback = () => {
    const [submitted, setSubmitted] = useState(false);

    function onSubmit(event) {
        event.preventDefault();

        // event.nativeEvent.submitter.dataset.response
        // => "yes" or "no"

        setSubmitted(true);
    }

    return (
        <div className="relative">
            {submitted ? (
                <FeedbackThanks />
            ) : (
                <FeedbackForm onSubmit={onSubmit} />
            )}
        </div>
    );
};
