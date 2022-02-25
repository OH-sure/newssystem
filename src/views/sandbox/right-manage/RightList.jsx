import React, { useState , useEffect} from 'react'

import { Table, Tag, Button, Modal, Popover, Switch} from 'antd';
import { EditOutlined, DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import axios from 'axios';

const {confirm} =Modal

export default function RightList() {

  const [dataSource,setDataSource] = useState([])
  
  useEffect(()=>{
    axios.get('http://localhost:3000/rights?_embed=children').then((res)=>{
      const list=res.data
      list.forEach((item)=>{
        if(item.children.length===0){
          item.children=""
        }
      })
       setDataSource(list)
    })
  },[])



  const columns = [
    {
      title: 'ID',
      dataIndex: 'id'
    },
    {
      title: '权限名称',
      dataIndex: 'title'
    },
    {
      title: '权限路径',
      dataIndex: 'key',
      render:(key)=>{
        return <Tag color={'#bfa'}>{key}</Tag>
      }
    },
    {
      title: '操作',
      render: (item) => {
        return <div>
          <Popover content={
          <div style={{textAlign:'center'}}>
            <Switch checked={item.pagepermisson} onChange={()=>{switchMethod(item)}}/>
          </div>
          } title="配置项" trigger={item.pagepermisson===undefined?'':'click'}>
            <Button type="primary" shape="round" icon={<EditOutlined />} disabled={item.pagepermisson===undefined}/>
          </Popover>
          <Button danger type="primary" shape="round" icon={<DeleteOutlined />} onClick={() => isDelet(item)} />

        </div>
      }
    }
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

  const deletMethod=(item)=>{
    console.log(item);
    
    if (item.grade===1) {
      setDataSource(dataSource.filter(data=>data.id!==item.id))
      axios.delete(`http://localhost:3000/rights/${item.id}`)
    }else{
      console.log(item.rightId);
      let list=dataSource.filter(data=>data.id===item.rightId)
      console.log(list);
      list[0].children=list[0].children.filter(data=>data.id!==item.id)

      setDataSource([...dataSource])
    }
    
  }

  const switchMethod = (item) => {
    item.pagepermisson = item.pagepermisson === 1 ? 0 : 1
    console.log(item.pagepermisson);
    setDataSource([...dataSource])

    if(item.grade===1){
      axios.patch(`http://localhost:3000/rights/${item.id}`,{
        pagepermisson:item.pagepermisson
      })
    }else{
      axios.patch(`http://localhost:3000/children/${item.id}`,{
        pagepermisson:item.pagepermisson
      })
    }
  }
  

  return (
    <div >
      <Table dataSource={dataSource} columns={columns} pagination={{pageSize:4}}/>
    </div>
  )
}
