import { Button, Profile } from '@ensdomains/thorin';
import { useAccount, useConnect, useEnsName } from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';

const injected = new InjectedConnector();

export const Navbar = () => {
    const { address } = useAccount();
    const { data: name } = useEnsName({ address });

    const { connect } = useConnect({ connector: injected });

    return (
        <div className="flex items-center justify-end gap-4 pb-8">
            {address ? (
                <>
                    <Profile address={address} ensName={name ?? undefined} />
                </>
            ) : (
                <Button borderRadius={'$full'} width={'$52'} onClick={connect}>
                    Connect
                </Button>
            )}
        </div>
    );
};
