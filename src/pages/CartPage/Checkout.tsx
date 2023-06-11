import { Button, Result, Skeleton } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom";
import { AppContext } from "../../App";

const CheckOut = () => {
    const { baseApi } = React.useContext(AppContext);
    const [isSuccess, setIsSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [message, setMessage] = useState("");
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate()

    const verify = React.useCallback(() => {
        setIsLoading(true)
        const payload = {
            transaction_info: searchParams.get("transaction_info"),
            order_code: searchParams.get("order_code"),
            price: searchParams.get("price"),
            payment_id: searchParams.get("payment_id"),
            payment_type: searchParams.get("payment_type"),
            error_text: searchParams.get("error_text"),
            secure_code: searchParams.get("secure_code")
        }
        axios.get(`${baseApi}/Checkouts/Receiver`, {
            params: payload
        }).then(res => {
            if (res.status === 200) {
                setIsSuccess(true);
                setMessage(res.data);
            }
        }).catch(error => {
            setIsSuccess(false);
            setMessage(error.response.data);
        }).finally(() => {
            setIsLoading(false)
        })
    }, [baseApi, searchParams])
    useEffect(() => {
        verify()

    }, [verify])

    return (
        <Skeleton active loading={isLoading}>
            <Result
                status={isSuccess ? "success" : "error"}
                title={message}
                subTitle={isSuccess ? "Đơn hàng của bạn đã được cập nhật" : "Vui lòng thử lại, hoặc liên hệ quản trị viên"}
                extra={[
                    <Button type="primary" onClick={() => navigate("/", { replace: true })} style={{ backgroundColor: 'blue' }}>Về trang chủ</Button>
                ]}
            />
        </Skeleton>
    )
}

export default CheckOut