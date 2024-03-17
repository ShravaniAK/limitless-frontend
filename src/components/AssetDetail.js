import React, { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import PlaceholderLoading from 'react-placeholder-loading'
import './asset.css'

const AssetDetail = () => {
  const [assetDetail, setAssetDetail] = useState(null);

  const { id } = useParams();

 
  useEffect(() => {
    const fetchAssetDetail = async () => {
      try {      
          const response = await fetch(`https://limitless-hackathon-backend.onrender.com/asset/${id}`);
          const data = await response.json();
          console.log(id)
          setAssetDetail(data.asset);
      } catch (error) {
        console.error('Error fetching asset detail:', error);
      }
    };

    fetchAssetDetail();
  });

  if (!assetDetail) {
    return (
     <div className='main'>
     <div className="info">
     <h2>     <PlaceholderLoading shape="rect" width={60} height={20} /><br />
</h2>
     <p >     <PlaceholderLoading shape="rect" width={30} height={20} /><br />
</p>
     </div>
     <div className="container">
       <div className="left">
         <p>     <PlaceholderLoading shape="rect" width={600} height={200} /><br />
</p>
       </div>
       <div className="right">

       </div>
     </div>
     <p>     <PlaceholderLoading shape="rect" width={60} height={20} /><br />
</p>
     <p>     <PlaceholderLoading shape="rect" width={600} height={200} /><br />
</p>
   </div>)
  } 

  return (
    <div className='main'>
      <div className="info">
      <h2>{assetDetail.name}</h2>
      <p > ({assetDetail.ticker})</p>
      </div>
      <div className="container">
        <div className="left">
          <p>{assetDetail.description}</p>
        </div>
        <div className="right">
      <img src={assetDetail.logo} alt={assetDetail.name} />
        </div>
      </div>
    </div>
  );
};

export default AssetDetail;