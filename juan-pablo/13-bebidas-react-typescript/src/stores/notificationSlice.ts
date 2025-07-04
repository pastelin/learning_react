import { StateCreator } from 'zustand';
import { FavoritesSliceType } from './favoriteSlice';

type Notification = {
    text: string;
    error?: boolean;
    show: boolean;
};

export type NotificationSliceType = {
    notification: Notification;
    showNotification: (payload: Pick<Notification, 'text' | 'error'>) => void;
	hideNotification: () => void;
};

// Se configura StateCreator<NotificationSliceType & FavoritesSliceType, [], [], NotificationSliceType> para poder acceder a los métodos de NotificationSliceType 
// y FavoritesSliceType en el store de Zustand.
export const createNotificationSlice: StateCreator<
    NotificationSliceType & FavoritesSliceType,
    [],
    [],
    NotificationSliceType
> = (set, get) => ({
    notification: {
        text: '',
        error: false,
        show: false,
    },
    showNotification: (payload) => {
        set({
            notification: {
                text: payload.text,
                error: payload.error ?? false,
                show: true,
            },
        });

        setTimeout(() => {
            get().hideNotification();
        }, 5000);
    },
	hideNotification: () => {
		set({
			notification: {
				text: '',
				error: false,
				show: false,
			},
		});
	}
});
