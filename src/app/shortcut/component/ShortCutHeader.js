
"use client"
import { Typography } from 'antd';

const { Text, Title } = Typography;

const ShortCutHeader = () => {
return <div className="text-center container mx-auto px-4">
    <Text type="secondary" italic>Application Shortcut</Text>
    <Title className="!mt-3.5" >Add the App to Your Home Screen</Title>
</div>

}

export default ShortCutHeader;