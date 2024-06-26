'use client';
import RelativeTime from '@yaireo/relative-time';
import { FC } from 'react';

const format = new RelativeTime();

export const TimeSince: FC<{ date: number }> = ({ date }) => (
    <>{format.from(new Date(date))}</>
);
