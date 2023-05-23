
const TrItems = ({ data }) => {
    return (
        <tr>
            <td className='d-flex align-items-center'>
                <div className="img-box">
                    <img src={data.product_img} alt="" />
                </div>
                <div className="d-flex flex-column">
                    <span>{data.product_name}</span>
                    <span>{data.seller_name}</span>
                    <span>{data.seller_phone}</span>
                </div>
            </td>
            <td className='text-center p-4'>2</td>
            <td>1,232$</td>
        </tr>
    )
}
export default TrItems
