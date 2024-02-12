import {Button, Drawer, Layout, Modal, Select, Space} from "antd";
import {useCrypto} from "../contex/crypto-context.jsx";
import {useEffect, useState} from "react";
import CoinInfoModal from "./CoinInfoModal.jsx";
import AddAssetForm from "./AddAssetForm.jsx";

const headerStyle = {
    weight: '100%',
    textAlign: 'center',
    height: 60,
    padding: '1rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
};

export default function AppHeader() {
    const [select, setSelect] = useState(false)
    const [modal, setModal] = useState(false)
    const [coin, setCoin] = useState(null)
    const [drawer, setDrawer] = useState(false)

    const {crypto} = useCrypto()

    useEffect(() => {
        const keypress = (event) => {
            if (event.key === '/') {
                setSelect((prev) => !prev)
            }
        }
        document.addEventListener('keypress', keypress)
        return () => document.removeEventListener('keypress', keypress)
    }, [])

    function handleChange(value) {
        setCoin(crypto.find((c) => c.id === value))
        setModal(true)
    }

    return (
        <Layout.Header style={headerStyle}>
            <Select
                style={{
                    width: 230,
                }}
                open={select}
                onSelect={handleChange}
                onClick={() => setSelect((prev) => !prev)}
                value='press / to open'
                options={crypto.map((coin) => ({
                    label: coin.name,
                    value: coin.id,
                    icon: coin.icon,
                }))}
                optionRender={(option) => (
                    <Space>
                        <img style={{width: 20}}
                             src={option.data.icon}
                             alt={option.data.label}/>
                        {option.data.label}
                    </Space>
                )}
            />
            <Button type="primary" onClick={() => setDrawer(true)}>Add Asset</Button>
            <Modal
                open={modal}
                footer={null}
                onCancel={() => setModal(false)}>
                <CoinInfoModal coin={coin}/>
            </Modal>
            <Drawer title="Add Asset"
                    width={600}
                    onClose={() => setDrawer(false)}
                    open={drawer}
                    destroyOnClose
            >

                <AddAssetForm onClose={()=> setDrawer(false)}/>
            </Drawer>
        </Layout.Header>
    )
}