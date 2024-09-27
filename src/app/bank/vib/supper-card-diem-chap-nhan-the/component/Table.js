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
    const search = vibCard.filter(item => item.name.includes(value) || item.type.includes(value) || item.note.includes(value));
    setSource(search);
  }

  return <div className="flex justify-center flex-col items-center overflow-auto w-full">
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