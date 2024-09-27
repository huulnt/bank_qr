'use client';

import { useState } from 'react';
import { Input, Table } from "antd";

import vibCard from '/public/local_data/vib_supper_card.json';


const columns = [
  {
    title: 'Địa điểm chấp nhận thẻ',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Loại Cửa Hàng',
    dataIndex: 'type',
    key: 'type',
  },
  {
    title: 'Ghi Chú',
    dataIndex: 'note',
    key: 'note',
  }
];


const TableComponent = () => {

  const [source, setSource] = useState(vibCard);
  const regex = /[^\w\s']/g;

  const handleChangeValue = (value) => {
    const search = vibCard.filter(item => {
      const name = item.name.toLowerCase();
      const type = item.type.toLowerCase();
      const note = item.note.toLowerCase();
      const text= value.toLowerCase();
      
      return name.includes(text) || type.includes(text) || note.includes(text);
    });
    setSource(search);
  }

  return <div className="flex justify-center flex-col items-center  w-full">
    <div className="mb-4 w-1/2">
      <Input placeholder="Tìm kiếm" size="large" onChange={(data) => {
        console.log("value: ", data.target.value)
        handleChangeValue(data.target.value)
      }}/>
    </div>

    <div className="w-full">
      <Table columns={columns} dataSource={source} />
    </div>

  </div>
}

export default TableComponent