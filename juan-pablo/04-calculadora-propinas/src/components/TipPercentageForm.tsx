const tipOptions = [
    {
        id: 'tip-10',
        value: 0.1,
        label: '10%',
    },
    {
        id: 'tip-20',
        value: 0.2,
        label: '20%',
    },
    {
        id: 'tip-50',
        value: 0.5,
        label: '50%',
    },
];

type TipPercentageFormProps = {
    readonly setTip: React.Dispatch<React.SetStateAction<number>>;
	readonly tip: number;
};

export const TipPercentageForm = ({setTip, tip}: TipPercentageFormProps) => {
    return (
        <div>
            <h3 className="font-black text-2xl">Propinas:</h3>

            <form>
                {tipOptions.map((tipOption) => (
                    <div key={tipOption.id} className="flex gap-2">
                        <label htmlFor={tipOption.id}>{tipOption.label}</label>
                        <input
                            type="radio"
                            id={tipOption.id}
                            name="tip"
                            value={tipOption.value}
							onChange={e => setTip(+e.target.value)}
							checked={tip === tipOption.value}
                        />
                    </div>
                ))}
            </form>
        </div>
    );
};
