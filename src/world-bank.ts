import axios from 'axios';

const WORLD_BANK_API_URL = 'https://api.worldbank.org/v2/country/EG/indicator/DT.DOD.DECT.CD';
const FORMAT = 'json';
const DATE_RANGE = '2000:2025';
// const currentYear = new Date().getFullYear();
// type DateRange = `${number}:${number}`;

function formatDebtValue(value: number): string {
    if (value >= 1_000_000_000) {
        return `${(value / 1_000_000_000).toFixed(1)}Bil`;
    } else if (value >= 1_000_000) {
        return `${(value / 1_000_000).toFixed(1)}Mil`;
    } else if (value >= 1_000) {
        return `${(value / 1_000).toFixed(1)}K`;
    } else {
        return value.toString();
    }
}

export async function fetchEgyptDebtData() {
    try {
        const response = await axios.get(WORLD_BANK_API_URL, {
            params: {
                format: FORMAT,
                date: DATE_RANGE,
            },
        });

        // the data is in the second element of the array
        const data = response.data[1];
        if (!data) {
            console.log('No data found for the specified range.');
            return;
        }

        console.log(`Egypt External Debt Data`);
        return data.map((entry: any) => ({
            year: entry.date,
            debtUSD: formatDebtValue(entry.value),
        }));
    } catch (error) {
        console.error('Error fetching data from World Bank API:', error);
    }
}
