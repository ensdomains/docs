import { ReactNode } from 'react';

import { navigation as protocolNavigation } from './navigation/protocol';

export type SectionData = {
    name: string;
    href: string;
    icon: ReactNode;
    activePattern?: RegExp;
    links: routeGroup[];
    expanded?: boolean;
};

export const isSectionData = (element: any): element is SectionData => {
    return (element as SectionData).name !== undefined;
};

export type routeLink = {
    title: string;
    href: string;
    icon?: string;
    external?: boolean;
    wip?: number | boolean;
    design_wip?: boolean;
};

export type routeGroup = {
    title: string;
    icon?: string;
    links: routeElement[];
};

export type routeElement = routeGroup | routeLink;
export const isRouteLink = (element: routeElement): element is routeLink => {
    return (element as routeLink).href !== undefined;
};
export const isRouteGroup = (element: routeElement): element is routeGroup => {
    return (element as routeGroup).links !== undefined;
};

export const navigation = {
    protocol: protocolNavigation,
};
