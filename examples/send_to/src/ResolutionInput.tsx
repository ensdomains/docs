import { formatAddress } from '@ens-tools/format';
import { Input } from '@ensdomains/thorin';
import {
    type Dispatch,
    type FC,
    type SetStateAction,
    useEffect,
    useState,
} from 'react';
import { FiCheck, FiLoader } from 'react-icons/fi';
import { useDebounce } from 'use-debounce';
import { normalize } from 'viem/ens';
import { type Address, useEnsAddress } from 'wagmi';

// regex for a valid domain name such as hello.yes.eth
const NAME_REGEX = /^(\w+\.)+\w+$/;
const ADDRESS_REGEX = /^0x[\dA-Fa-f]{40}$/;

export const ResolutionInput: FC<{
    setAddress: Dispatch<SetStateAction<Address | undefined>>;
}> = ({ setAddress }) => {
    const [input, setInput] = useState('');
    const [debouncedInput] = useDebounce(input, 200);

    const coinType = 60;
    const matchesNameRegex = NAME_REGEX.test(debouncedInput);

    const { data: resolvedAddress, isLoading } = useEnsAddress({
        name: normalize(debouncedInput),
        // @ts-ignore
        coinType,
        enabled: matchesNameRegex && debouncedInput == input,
    });

    const isValidName =
        resolvedAddress &&
        ADDRESS_REGEX.test(resolvedAddress) &&
        matchesNameRegex;
    const isValidAddress = ADDRESS_REGEX.test(input);

    const isValid = isValidName || isValidAddress;

    useEffect(() => {
        console.log('yee');

        if (isValidName) {
            setAddress(resolvedAddress as Address);
        }

        if (isValidAddress) {
            setAddress(input as Address);
        }

        if (!isValid) {
            // eslint-disable-next-line unicorn/no-useless-undefined
            setAddress(undefined);
        }
    }, [isValidName, isValidAddress, isValid, input, resolvedAddress]);

    return (
        <div className="w-full">
            <div className="flex w-full items-center justify-stretch gap-2">
                <Input
                    label={'Address or Name'}
                    placeholder="0x225... or luc.eth"
                    value={input}
                    onChange={(event) => setInput(event.target.value)}
                    // @ts-expect-error
                    width="100%"
                    validated={isValid}
                    // stylistic choice
                    clearable
                />
                {isLoading && (
                    <div className="pt-6">
                        <FiLoader className="text-ens-blue1 animate-spin" />
                    </div>
                )}
                {isValid && (
                    <div className="pt-6">
                        <FiCheck className="text-ens-green" />
                    </div>
                )}
            </div>
            {isValidName && (
                <div className="text-sm text-ens-grey2 pl-2">
                    Resolves to{' '}
                    <a
                        target="_blank"
                        href={`https://etherscan.io/address/${resolvedAddress}`}
                        className="text-ens-blue hover:underline"
                    >
                        {formatAddress(resolvedAddress)}
                    </a>
                </div>
            )}
        </div>
    );
};
