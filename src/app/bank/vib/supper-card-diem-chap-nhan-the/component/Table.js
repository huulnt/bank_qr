'use client';

import { useState } from 'react';
import { Input, Table, Tooltip, Typography } from "antd";

import vibCard from '/public/local_data/vib_supper_card.json';
const { Text } = Typography;



const TableComponent = () => {

  const [source, setSource] = useState(vibCard);
  const regex = /[^\w\s']/g;

  const columns = [
    {
      title: 'Địa điểm chấp nhận thẻ',
      dataIndex: 'name',
      key: 'name',
      ellipsis: {
        showTitle: false,
      },
      render: (text) => <Tooltip placement="topLeft" title={text}>
        <Text >{text}</Text>
      </Tooltip>,

    },
    {
      title: 'Loại Cửa Hàng',
      dataIndex: 'type',
      key: 'type',
      render: (text) => <Text italic>{text}</Text>,
      width: 150
    },
    {
      title: 'Danh Mục Chi Tiêu',
      dataIndex: 'category',
      key: 'category'
    },
    {
      title: 'Ghi Chú',
      dataIndex: 'note',
      key: 'note',
      width: 100
    }
  ];

  const handleChangeValue = (value) => {
    const search = vibCard.filter(item => {
      const name = item.name.toLowerCase();
      const type = item.type.toLowerCase();
      const note = item.note.toLowerCase();
      const text = value.toLowerCase();

      return name.includes(text) || type.includes(text) || note.includes(text);
    });
    setSource(search);
  }

  return <div className="flex justify-center flex-col items-center  w-full">
    <div className="mb-4 w-1/2">
      <Input placeholder="Tìm kiếm" size="large" onChange={(data) => {
        console.log("value: ", data.target.value)
        handleChangeValue(data.target.value)
      }} />
    </div>

    <div className="w-full">
      <Table columns={columns} dataSource={source} />
    </div>

  </div>
}

export default TableComponent