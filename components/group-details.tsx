'use client';

import { ModelsTable } from '@/components/models-table';
import type { ReactNode } from 'react';

interface GroupDetailsProps {
    group: string;
    cliSupported: string[];
    thirdParty: boolean;
    ratio: number;
    children: ReactNode;
}

export function GroupDetails({ group, cliSupported, thirdParty, ratio, children }: GroupDetailsProps) {
    return (
        <>
            <table>
                <tbody>
                    <tr>
                        <td><b>分组介绍</b></td>
                        <td>{children}</td>
                    </tr>
                    <tr>
                        <td><b>可用于 CLI</b></td>
                        <td>{cliSupported.join(', ')}</td>
                    </tr>
                    <tr>
                        <td><b>第三方调用</b></td>
                        <td>{thirdParty ? '是' : '否'}</td>
                    </tr>
                    <tr>
                        <td><b>倍率</b></td>
                        <td>{ratio}x</td>
                    </tr>
                </tbody>
            </table>

            <h3>模型列表</h3>
            <ModelsTable group={group} />
        </>
    );
}
