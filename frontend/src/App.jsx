import {CryptoContextProvider} from "./components/contex/crypto-context.jsx";
import AppLayout from "./components/loyout/AppLayout.jsx";



export default function App() {
    return (
        <CryptoContextProvider>
            <AppLayout/>
        </CryptoContextProvider>

    )
}
