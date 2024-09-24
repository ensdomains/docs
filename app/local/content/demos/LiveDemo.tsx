import { FC } from 'react';
import { holesky, mainnet, sepolia } from 'viem/chains';

import { DemoBorder } from './border/Border';
import { ETHRegistryDemo } from './ethregistry/ETHRegistryDemo';
import { ETHRegistryRenewDemo } from './ethregistryrenew/ETHRegistryRenewDemo';
import { ListNamesDemo } from './listnames/ListNamesDemo';
import { NameLookupDemo } from './namelookup/NameLookup';
import { ResolverPlaygroundDemo } from './resolverplayground';
import { ResolverTestDemo } from './resolvertest';
import { ReverseSetNameForDemo } from './reverse-set-name-for/ReverseSetNameForDemo';
import { SendTransactionDemo } from './send-transaction/SendTransaction';
import { SiweDemo } from './siwe/SiweDemo';

const demos = {
    ethregistry: {
        title: 'Register a name',
        wallet: true,
        chains: new Set([mainnet.id, sepolia.id]),
        component: ETHRegistryDemo,
    },
    ethregistry_renew: {
        title: 'Renew a name',
        wallet: true,
        chains: new Set([mainnet.id, sepolia.id]),
        component: ETHRegistryRenewDemo,
    },
    name_lookup: {
        title: 'Name Lookup',
        wallet: false,
        component: NameLookupDemo,
    },
    siwe: {
        title: 'SIWE',
        wallet: true,
        component: SiweDemo,
    },
    resolver_test: {
        title: 'Resolver Test',
        wallet: true,
        component: ResolverTestDemo,
    },
    send_transaction: {
        title: 'Send Transaction',
        wallet: true,
        component: SendTransactionDemo,
    },
    reversesetnamefordemo: {
        title: 'Reverse Set Name For',
        wallet: true,
        chains: new Set([mainnet.id]),
        component: ReverseSetNameForDemo,
    },
    listnamesdemo: {
        title: 'List Names',
        wallet: true,
        chains: new Set([mainnet.id, sepolia.id, holesky.id]),
        component: ListNamesDemo,
    },
    resolverdemo: {
        title: 'Resolver Playground',
        wallet: true,
        chains: new Set([mainnet.id, sepolia.id, holesky.id]),
        component: ResolverPlaygroundDemo,
    },
};

export const LiveDemo: FC<{ id?: string }> = ({ id }) => {
    const demo = demos[id];

    return (
        <DemoBorder
            showConnect={demo.wallet}
            title={demo.title}
            chains={demo.chains}
        >
            {demo.component && <demo.component />}
        </DemoBorder>
    );
};
