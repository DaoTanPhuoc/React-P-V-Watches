import Table, { ColumnsType } from 'antd/es/table';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from "../../../App";
import moment from 'moment';

interface DataType {
    key: string;
    FullName: string;
    Action: string;
    CreatedDate: Date;
}
const LogsDashboard = () => {
    const { currentToken } = useContext(AppContext);
    const [logs, setLogs] = useState<any[]>([])
    // call api logs
    useEffect(() => {
        axios
            .get(`https://localhost:7182/api/Logs`, {
                headers: {
                    'Authorization': `Bearer ${currentToken}`,
                },
            })
            .then((res) => {
                setLogs(
                    res.data.map(
                        (row: {
                            FullName: string;
                            Action: string;
                            CreatedAt: Date;
                        }) => ({
                            FullName: row.FullName,
                            Action: row.Action,
                            CreatedAt: row.CreatedAt,
                        })
                    )
                );
            })
            .catch((error) => {
                console.log(error);
            })
    }, [])
    //
    const columns: ColumnsType<DataType> = [
        {
            title: 'Tên người thao tác',
            dataIndex: 'FullName',
            key: 'FullName',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Hành động',
            dataIndex: 'Action',
            key: 'Action',
        },
        {
            title: "Thời gian",
            dataIndex: "CreatedAt",
            render: (CreatedAt) => moment(CreatedAt).format("DD-MM-YYYY, hh:mm:ss")
        }
    ];
    return (
        <div>
            <div>
                <h4 style={{ color: "#4963AF", fontWeight: 700, fontSize: 23, padding: "20px 20px", textTransform: "uppercase" }}>
                    Bảng lịch sử thao tác
                </h4>
            </div>
            <div>
                <Table columns={columns} dataSource={logs} pagination={{ position: ['bottomCenter'] }}
                    scroll={{ x: '100%' }} />
            </div>
        </div>
    )
}

export default LogsDashboard