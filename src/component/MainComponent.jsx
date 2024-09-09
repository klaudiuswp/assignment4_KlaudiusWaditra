import { useEffect, useState } from "react"

export default function MainComponent() {

    const [currRate, setCurrRate] = useState([])

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        try {
            const data = await fetch('https://api.currencyfreaks.com/v2.0/rates/latest?apikey=92bdccf3e1864d24b3e4b18d1f3054f3', { method: "GET" })
                .then(response => response.json()).catch('gagal fetch api');

            setCurrRate({
                'CAD': data.rates.CAD,
                'IDR': data.rates.IDR,
                'JPY': data.rates.JPY,
                'CHF': data.rates.CHF,
                'EUR': data.rates.EUR,
                'GBP': data.rates.GBP
            });
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            {/* <p>
                {
                    JSON.stringify(currRate)
                }
            </p> */}

            <div className="container-fluid d-flex align-items-center justify-content-center" style={{ height: '100vh', backgroundColor: 'rgba(239, 108, 56, 1)' }}>
                <div className="row align-self-center">

                    <table class="table table-dark">
                        <thead>
                            <tr>
                                <th scope="col" style={{ backgroundColor: 'transparent' }}>#</th>
                                <th scope="col" style={{ backgroundColor: 'transparent' }}>We Buy</th>
                                <th scope="col" style={{ backgroundColor: 'transparent' }}>Exchange Rate</th>
                                <th scope="col" style={{ backgroundColor: 'transparent' }}>We Sell</th>
                            </tr>
                        </thead>
                        <tbody className="table-group-divider">
                            {
                                Object.entries(currRate).map(([currency, rate]) => (
                                    <tr key={currency}>
                                        <th style={{ backgroundColor: 'transparent' }}>{currency}</th>
                                        <td style={{ backgroundColor: 'transparent' }}>{parseFloat(rate * 105 / 100).toFixed(4)}</td>
                                        <td style={{ backgroundColor: 'transparent' }}>{parseFloat(rate).toFixed(4)}</td>
                                        <td style={{ backgroundColor: 'transparent' }}>{parseFloat(rate * 95 / 100).toFixed(4)}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                    <div className="d-inline-flex justify-content-center">
                        <p className="text-white text-start">* Base Currency is USD <br />* As for the API, https://currencyfreaks.com/ is used.</p>
                    </div>
                </div>
            </div>
        </>
    )
}