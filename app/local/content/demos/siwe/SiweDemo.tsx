'use client';

import { formatAddress } from '@ens-tools/format';
import { useEffect } from 'react';
import { FaSignature, FaSpinner } from 'react-icons/fa';
import { ImExit } from 'react-icons/im';
import { SiweMessage } from 'siwe';
import {
    useAccount,
    useConnect,
    useDisconnect,
    useEnsName,
    useSignMessage,
} from 'wagmi';

import { ClientOnly } from '@/ClientOnly';
import { Button } from '@/components/Button';

const Demo = () => {
    const { address, isConnected } = useAccount();
    const { connect } = useConnect();
    const { disconnect } = useDisconnect();
    const { data: ensName } = useEnsName({ address });
    const {
        data: signatureData,
        signMessage,
        isPending,
        reset,
    } = useSignMessage({});

    useEffect(() => {
        reset();
    }, [address]);

    return (
        <div className="flex w-full flex-col items-center justify-center py-2">
            {isConnected ? (
                <>
                    <div>
                        Connected as{' '}
                        <a
                            href={'https://ens.app/' + ensName}
                            className="text-blue-500"
                        >
                            {ensName || formatAddress(address)}
                        </a>
                    </div>
                    <div className="flex items-stretch gap-2">
                        <Button
                            variant="primary"
                            className="flex items-center gap-2"
                            onClick={() => {
                                const domain = location.host;
                                const statement =
                                    'I solemnly swear this is a cool demo';
                                const message = new SiweMessage({
                                    domain,
                                    address,
                                    statement,
                                    uri: location.origin,
                                    version: '1',
                                    chainId: 1,
                                });

                                signMessage();
                            }}
                        >
                            {isPending ? (
                                <FaSpinner className="animate-spin" />
                            ) : (
                                <FaSignature />
                            )}
                            {isPending ? 'Opening wallet...' : 'Sign in'}
                        </Button>
                        <Button
                            variant="secondary"
                            className="flex items-center gap-2"
                            onClick={() => {
                                disconnect();
                            }}
                        >
                            <ImExit />
                        </Button>
                    </div>
                    {signatureData && (
                        <div className="mt-2 rounded-md border border-green-200 bg-green-50 px-3 py-0.5 text-green-500">
                            Signature Verified!
                        </div>
                    )}
                </>
            ) : (
                <Button
                    variant="primary"
                    onClick={() => {
                        connect();
                    }}
                >
                    Connect Wallet
                </Button>
            )}
        </div>
    );
};

export const SiweDemo = () => <ClientOnly child={() => <Demo />} />;
