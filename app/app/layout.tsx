import './globals.css';
import 'focus-visible';
import '@ens-tools/thorin-core/style.css';

import {
    PropertyValueSpecification,
    SearchAction,
    WebSite,
    WithContext,
} from 'schema-dts';

import { Theme } from './theme';

export const metadata = {
    title: 'ENS Documentation',
    description: 'Documentation for the ENS protocol.',
};

type CustomSearchAction = SearchAction & {
    'query-input': PropertyValueSpecification | String;
};

const searchAction: CustomSearchAction = {
    '@type': 'SearchAction',
    target: 'https://docs.ens.domains?q={search_term_string}',
    'query-input': 'required name=search_term_string',
};

const jsonLD: WithContext<WebSite> = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    url: 'https://docs.ens.domains',
    name: metadata.title,
    description: metadata.description,
    potentialAction: searchAction,
};

export default function RootLayout(properties) {
    const { children } = properties;

    return (
        <html
            lang="en"
            suppressHydrationWarning
            className="not-system scrollbar"
        >
            <head>
                <link rel="icon" href="/favicon.ico" sizes="any" />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLD) }}
                />
            </head>
            <body className="bg-ens-light-background-primary text-ens-light-text-primary dark:bg-ens-dark-background-primary dark:text-ens-dark-text-primary">
                <Theme>{children}</Theme>
                <script
                    defer
                    data-domain="docs.ens.domains"
                    src="https://ens.v3x.report/js/script.js"
                ></script>
                <script
                    defer
                    data-domain="docs.ens.domains"
                    src="https://plausible.io/js/script.js"
                ></script>
            </body>
        </html>
    );
}
