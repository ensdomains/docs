/* eslint-disable sonarjs/no-duplicate-string */
import { CodeGroup } from '../content/prose/code/group/CodeGroup';

export type ContractParameter = {
    name?: string;
    type: string;
    description: string;
};

export type ContractMethod = {
    name: string;
    interface: string;
    usage: string;
    seeMore: string;
    input?: Array<ContractParameter>;
    output?: Array<ContractParameter>;
    events?: Array<string>;
    examples?: Array<any>;
};

export function interfaceDetails(methods: Array<ContractMethod>) {
    return (
        <>
            <table>
                <thead>
                    <tr>
                        <th>Usage</th>
                        <th>Function Definition</th>
                    </tr>
                </thead>
                <tbody>
                    {methods.map((method) => {
                        return (
                            <tr>
                                <td>
                                    <a href={`#${method.interface}`}>
                                        <strong>{method.usage}</strong>
                                    </a>
                                </td>
                                <td>{method.name}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            {methods.map((method) => {
                return (
                    <div>
                        <h2 id={method.interface}>{method.usage}</h2>
                        <CodeGroup title="Function">
                            <code>{method.name}</code>
                        </CodeGroup>
                        {method.events && (
                            <CodeGroup title="Emitted Events">
                                {method.events.map((event) => (
                                    <code>{event}</code>
                                ))}
                            </CodeGroup>
                        )}
                        {method.seeMore && convertEIPLinks(method.seeMore)}
                        <ul>
                            <li>
                                <strong>Interface ID: </strong>
                                <code>{method.interface}</code>
                            </li>
                        </ul>
                        {method.input && (
                            <>
                                <h3 id={`${method.interface}-input`}>
                                    Parameters
                                </h3>
                                <ul>
                                    {method.input.map((input) => {
                                        return (
                                            <li>
                                                <strong>
                                                    {input.name
                                                        ? `${input.name} (${input.type})`
                                                        : input.type}
                                                    {': '}
                                                </strong>
                                                <span>
                                                    {convertCodeTags(
                                                        input.description
                                                    )}
                                                </span>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </>
                        )}
                        {method.output && (
                            <>
                                <h3 id={`${method.interface}-output`}>
                                    Returns
                                </h3>
                                <ul>
                                    {method.output.map((output) => {
                                        return (
                                            <li>
                                                <strong>
                                                    {output.name
                                                        ? `${output.name} (${output.type})`
                                                        : output.type}
                                                    {': '}
                                                </strong>
                                                <span>
                                                    {convertCodeTags(
                                                        output.description
                                                    )}
                                                </span>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </>
                        )}
                        {method.examples && (
                            <>
                                <h3 id={`${method.interface}-examples`}>
                                    Examples
                                </h3>
                                {method.examples}
                            </>
                        )}
                    </div>
                );
            })}
        </>
    );
}

// Convert any EIP/ENSIPs into links
function convertEIPLinks(string_: string) {
    return string_.split(/(EIP-\d+|ENSIP-\d+).*?/g).map((part) => {
        if (/EIP-\d+/.test(part)) {
            return (
                <a href={`https://eips.ethereum.org/EIPS/eip-${part.slice(4)}`}>
                    {part}
                </a>
            );
        } else if (/ENSIP-\d+/.test(part)) {
            return <a href={`/ensip/${part.slice(6)}`}>{part}</a>;
        } else {
            return part;
        }
    });
}

// Convert any `` into <code>
function convertCodeTags(string_: string) {
    return string_ && string_.includes('`')
        ? string_.split(/(`[^`]+`).*?/g).map((part) => {
              return /`[^`]+`/.test(part) ? (
                  <code>{part.slice(1, -1)}</code>
              ) : (
                  part
              );
          })
        : string_ || '';
}
