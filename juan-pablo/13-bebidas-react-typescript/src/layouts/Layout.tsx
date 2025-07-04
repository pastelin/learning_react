import { Outlet } from 'react-router-dom';
import { Header } from '../components/Header';
import Modal from '../components/Modal';
import { useAppStore } from '../stores/useAppStore';
import { useEffect } from 'react';
import Notification from '../components/Notification';

export const Layout = () => {
    const loadFromStorage = useAppStore((state) => state.loadFromStorage);

    useEffect(() => {
        loadFromStorage();
    }, [loadFromStorage]);

    return (
        <>
            <Header />

            <main className="container mx-auto py-16 px-20">
                <Outlet />
            </main>

            <Modal />
            <Notification />
        </>
    );
};
