import Image from 'next/image';

import { Button } from '@/components/Button';
import { Layout } from '@/layout/PageLayout';

export default function NotFound() {
    return (
        <Layout
            mdxProperties={{
                title: 'Not Found',
                meta: {
                    title: 'Not Found',
                    description: 'ENS Documentation',
                },
            }}
        >
            <div className="not-prose text-center">
                <Image
                    alt="Shrug"
                    src="/shrug.png"
                    width={200}
                    height={200}
                    className="mx-auto"
                />
                <h1 className="mt-4 text-2xl font-bold">Article Not Found</h1>
                <p className="mb-3">It doesn't look like this page exists...</p>
                <Button href="/" variant="primary" className="" arrow="left">
                    Go to Home
                </Button>
            </div>
        </Layout>
    );
}
