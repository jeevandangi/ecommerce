


const PaymentForm = () => {
    return (
        <>

            <form action="https://rc-epay.esewa.com.np/api/epay/main/v2/form" method="POST">
                <input type="text" id="amount" name="amount" defaultValue={100} required />
                <input type="text" id="tax_amount" name="tax_amount" defaultValue={10} required />
                <input type="text" id="total_amount" name="total_amount" defaultValue={110} required />
                <input type="text" id="transaction_uuid" name="transaction_uuid" defaultValue={123} required />
                <input type="text" id="product_code" name="product_code" defaultValue="EPAYTEST" required />
                <input type="text" id="product_service_charge" name="product_service_charge" defaultValue={0} required />
                <input type="text" id="product_delivery_charge" name="product_delivery_charge" defaultValue={0} required />
                <input type="text" id="success_url" name="success_url" defaultValue="https://esewa.com.np" required />
                <input type="text" id="failure_url" name="failure_url" defaultValue="https://google.com" required />
                <input type="text" id="signed_field_names" name="signed_field_names" defaultValue="total_amount,transaction_uuid,product_code" required />
                <input type="text" id="signature" name="signature" defaultValue="i94zsd3oXF6ZsSr/kGqT4sSzYQzjj1W/waxjWyRwaME=" required />
                <input defaultValue="Submit" type="submit" />
            </form>



        </>
    )
}

export { PaymentForm }