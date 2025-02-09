type TCategoryNames = 'all-wallpapers' | 'favourite' | string;
interface TCategory {
    name: string;
    previewUrl: string;
}

export type { TCategoryNames, TCategory };
