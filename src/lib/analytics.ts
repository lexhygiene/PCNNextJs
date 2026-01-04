export const sendGAEvent = (action: string, label: string) => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', action, {
            event_category: 'Conversion',
            event_label: label,
        });
    }
};
