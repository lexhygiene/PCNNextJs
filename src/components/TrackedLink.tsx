'use client';

import { sendGAEvent } from "@/lib/analytics";
import { ReactNode } from "react";

interface TrackedLinkProps {
    href: string;
    children: ReactNode;
    eventName: string;
    eventLabel: string;
    className?: string;
    target?: string;
}

export default function TrackedLink({ href, children, eventName, eventLabel, className, target }: TrackedLinkProps) {
    const handleClick = () => {
        sendGAEvent(eventName, eventLabel);
    };

    return (
        <a
            href={href}
            onClick={handleClick}
            className={className}
            target={target}
            rel={target === '_blank' ? 'noopener noreferrer' : undefined}
        >
            {children}
        </a>
    );
}
