import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PlaceholderLoading from 'react-placeholder-loading';
import { format, parseISO } from 'date-fns'; // Import date-fns functions
import './asset.css';
import Graph from './Graph';

const apiURL = process.env.REACT_APP_API_URL;

const AssetDetail = () => {
  const { id } = useParams();
  const [assetDetail, setAssetDetail] = useState(null);

  useEffect(() => {
    fetchAssetDetail();
  }, [id]);

  const fetchAssetDetail = async () => {
    try {      
        const response = await fetch(`${apiURL}/asset/${id}`);
        const data = await response.json();
        console.log(data);
        setAssetDetail(data.asset);
    } catch (error) {
      console.error('Error fetching asset detail:', error);
    }
  };

  if (!assetDetail) {
    return (
     <div className='main'>
     <div className="info">
     <h2><PlaceholderLoading shape="rect" width={60} height={20} /><br /></h2>
     <p><PlaceholderLoading shape="rect" width={30} height={20} /><br /></p>
     </div>
     <div className="container">
       <div className="left">
         <p><PlaceholderLoading shape="rect" width={600} height={200} /><br /></p>
       </div>
       <div className="right"></div>
     </div>
     <p><PlaceholderLoading shape="rect" width={60} height={20} /><br /></p>
     <p><PlaceholderLoading shape="rect" width={600} height={200} /><br /></p>
   </div>
  );
  } 

  return (
    <div className='px-12 flex h-[calc(100vh-120px)]'>
      <div className='w-[48%]'>
        <div className='flex space-x-8'>
          <div>
            <img src={assetDetail.logo || 'default.jpg'} alt={assetDetail.name} className='w-24 h-24' />
          </div>
      <div>
      <p className='text-3xl font-bold'>{assetDetail.name}</p>
      <p>{assetDetail.ticker}</p>
      <p className='text-gray-500'>{assetDetail.assetClass}</p>
      </div>
      </div>
      <div className='mt-8'>
        <p className='text-xl font-bold mb-2'>Description</p>
      <p>{assetDetail.description}</p>
      </div>
      <div className='mt-8'>
        <p className='text-xl font-bold'>Past Transactions</p>
        <table className='w-full mt-4 border-collapse border border-gray-300'>
            <thead>
              <tr className='bg-gray-200'>
                <th className='border border-gray-300 px-4 py-2'>Date</th>
                <th className='border border-gray-300 px-4 py-2'>Price</th>
              </tr>
            </thead>
            <tbody>
              {assetDetail.PastValues.map((item, index) => (
                <tr key={index}>
                  <td className='border border-gray-300 px-4 py-2'>{format(parseISO(item.date), 'MMMM d, yyyy')}</td>
                  <td className='border border-gray-300 px-4 py-2'>{item.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
      </div>
      </div>
      <div className="w-[50%]">
        <Graph data={assetDetail.PastValues} />
      </div>
    </div>
  );
};

export default AssetDetail;
