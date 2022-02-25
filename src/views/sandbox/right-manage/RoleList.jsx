import React, { useState , useEffect} from 'react'

import { Table, Button, Modal, Tree} from 'antd';
import { UnorderedListOutlined, DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import axios from 'axios';

const {confirm} =Modal

export default function RoleList() {

  const [dataSource,setDataSource] = useState([])
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [rightList,setRightList] = useState([])
  const [CurrentRight, setCurrentRight] = useState([]);
  const [currentId, setCurrentId] = useState(0);

  useEffect(()=>{
    axios.get('http://localhost:3000/roles').then((res)=>{
       setDataSource(res.data)
    })
    
  },[])

  useEffect(()=>{
    axios.get('http://localhost:3000/rights?_embed=children').then((res)=>{
      console.log(res.data);
      setRightList(res.data)
    })
  },[])

  const columns=[
    {
      title: 'ID',
      dataIndex: 'id'
    },
    {
      title: '角色名称',
      dataIndex: 'roleName'
    },
    {
      title: '操作',
      render: (item) => {
        return <div>

          <Button type="primary" shape="round" icon={<UnorderedListOutlined />} onClick={()=>{
            setIsModalVisible(true);
            console.log(item);
            setCurrentRight(item.rights)
            setCurrentId(item.id)
          }} />
          <Button danger type="primary" shape="round" icon={<DeleteOutlined />} onClick={() => isDelet(item)} />

        </div>  
      }
    },
    
  ]

  const isDelet=(item)=>{
    confirm({
      title: '确认要删除吗?',
      icon: <ExclamationCircleOutlined />,
      onOk() {
        deletMethod(item)
      },
      onCancel() {
        console.log('Cancel');
      },
    })
  }

  const deletMethod = (item) => {
    console.log(item);

    
      setDataSource(dataSource.filter(data => data.id !== item.id))
      axios.delete(`http://localhost:3000/roles/${item.id}`)

      setDataSource([...dataSource])

  }



  const handleOk = () => {
    setIsModalVisible(false);

    setDataSource(dataSource.map(item=>{
      if (item.id===currentId) {
        return{
          ...item,
          rights:CurrentRight
        }
      }else{
        return item
      }
    }))

    axios.patch(`http://localhost:3000/roles/${currentId}`,{
      rights:CurrentRight})
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onCheck=(checkedKeys)=>{
    // console.log(checkedKeys);
    setCurrentRight(checkedKeys)
  }

  return (
    <div>

      <Table dataSource={dataSource} columns={columns} pagination={{ pageSize: 4 }} rowKey={(item) => item.id} />

      <Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>

        <Tree
          checkable
          checkedKeys={CurrentRight}
          treeData={rightList}
          onCheck={onCheck}
          checkStrictly={true}
        />
      </Modal>

    </div>
  )
}
