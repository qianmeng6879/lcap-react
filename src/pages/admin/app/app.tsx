import { useEffect, useRef, useState } from "react"
import { Divider, Tabs } from "antd"
import { getAppClientApi } from "@/api"
import AppClientItem from "@/components/AppClientItem"
import AddAppClientFormModal from "@/components/AddAppClientFormModal"
import { AppClient } from "@/api/app_client/types"

type TargetKey = React.MouseEvent | React.KeyboardEvent | string;

const initialItems = [
    { label: 'Tab 1', children: 'Content of Tab 1', key: '1' },
    { label: 'Tab 2', children: 'Content of Tab 2', key: '2' },
    {
        label: 'Tab 3',
        children: 'Content of Tab 3',
        key: '3',
        closable: false,
    },
];

export default function AppList() {
    const [data, setData] = useState(Array<AppClient>)
    useEffect(() => {
        getAppClientApi().then(
            res => {
                setData(res.results)
            }
        )
    }, [])

    const addClientAction = (data: AppClient) => {
        getAppClientApi().then(
            res => {
                setData(res.results)
            }
        )
    }

    const [activeKey, setActiveKey] = useState(initialItems[0].key);
    const [items, setItems] = useState(initialItems);
    const newTabIndex = useRef(0);

    const onChange = (newActiveKey: string) => {
        setActiveKey(newActiveKey);
    };

    const add = () => {
        const newActiveKey = `newTab${newTabIndex.current++}`;
        const newPanes = [...items];
        newPanes.push({ label: 'New Tab', children: 'Content of new Tab', key: newActiveKey });
        setItems(newPanes);
        setActiveKey(newActiveKey);
    };

    const remove = (targetKey: TargetKey) => {
        let newActiveKey = activeKey;
        let lastIndex = -1;
        items.forEach((item, i) => {
            if (item.key === targetKey) {
                lastIndex = i - 1;
            }
        });
        const newPanes = items.filter((item) => item.key !== targetKey);
        if (newPanes.length && newActiveKey === targetKey) {
            if (lastIndex >= 0) {
                newActiveKey = newPanes[lastIndex].key;
            } else {
                newActiveKey = newPanes[0].key;
            }
        }
        setItems(newPanes);
        setActiveKey(newActiveKey);
    };

    const onEdit = (
        targetKey: React.MouseEvent | React.KeyboardEvent | string,
        action: 'add' | 'remove',
    ) => {
        if (action === 'add') {
            add();
        } else {
            remove(targetKey);
        }
    };

    return (
        <div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ marginRight: '20px', fontSize: '20px' }}>应用列表</div>
                <AddAppClientFormModal addAction={addClientAction} />
            </div>
            <Divider />
            <Tabs
                type="editable-card"
                onChange={onChange}
                activeKey={activeKey}
                onEdit={onEdit}
                items={items}
            />
            <div className="app_list">
                {
                    data.map(item => {
                        return (
                            <a key={item.id}>
                                <AppClientItem app={item} />
                            </a>
                        )
                    })
                }
            </div>
        </div >
    )
}
