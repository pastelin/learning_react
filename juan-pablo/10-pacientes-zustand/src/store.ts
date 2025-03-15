import { create } from 'zustand';
import { DraftPatient, Patient } from './types';
import { v4 as uuidv4 } from 'uuid';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';

type PatientState = {
    patients: Patient[];
    activeId: Patient['id'];
    addPatient: (data: DraftPatient) => void;
    deletePatient: (id: Patient['id']) => void;
    getPatientById: (id: Patient['id']) => void;
    updatePatient: (data: DraftPatient) => void;
};

const createPatient = (patient: DraftPatient): Patient => {
    return {
        id: uuidv4(),
        ...patient,
    };
};

export const usePatienStore = create<PatientState>()(
    devtools(
        persist(
            (set) => ({
                patients: [],
                activeId: '',
                addPatient: (data) => {
                    set((state) => ({
                        patients: [...state.patients, createPatient(data)],
                    }));
                },
                deletePatient: (id) => {
                    set((state) => ({
                        patients: state.patients.filter(
                            (patient) => patient.id !== id
                        ),
                    }));
                },
                getPatientById: (id) => {
                    set(() => ({
                        activeId: id,
                    }));
                },
                updatePatient: (data) => {
                    set((state) => ({
                        patients: state.patients.map((patient) =>
                            patient.id === state.activeId
                                ? { ...patient, ...data }
                                : patient
                        ),
                        activeId: '',
                    }));
                },
            }),
            {
                name: 'patients-storage',
                storage: createJSONStorage(() => localStorage),
            }
        )
    )
);
