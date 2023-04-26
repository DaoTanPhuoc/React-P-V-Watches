import { Button, Input, Select, Space } from "antd";
import React, { useState } from "react";
import { DownloadOutlined } from "@ant-design/icons";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Search } from "react-router-dom";
import { SizeType } from "antd/es/config-provider/SizeContext";
import "./PostDashboard.css";
import Table, { ColumnsType } from "antd/es/table";
const PostDashboard = () => {
  const [content, setContent] = useState("");

  function handleChange(value: React.SetStateAction<string>) {
    setContent(value);
  }

  const onSearch = (value: string) => console.log(value);
  const { Search } = Input;
  const [size, setSize] = useState<SizeType>("large");

  interface DataType {
    key: React.Key;
    name: string;
    // age: number;
    address: string;
  }

  const columns: ColumnsType<DataType> = [
    {
      title: "Name",
      dataIndex: "name",
    },
    // {
    //   title: "Age",
    //   dataIndex: "age",
    // },
    {
      title: "Address",
      dataIndex: "address",
    },
  ];

  const data: DataType[] = [];
  for (let i = 0; i < 46; i++) {
    data.push({
      key: i,
      name: `Edward King ${i}`,
      // age: 32,
      address: `London, Park Lane no. ${i}`,
    });
  }

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [loading, setLoading] = useState(false);

  const start = () => {
    setLoading(true);
    setTimeout(() => {
      setSelectedRowKeys([]);
      setLoading(false);
    }, 1000);
  };

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const hasSelected = selectedRowKeys.length > 0;

  return (
    <>
      <ReactQuill value={content} onChange={handleChange} />
      <div>
        <div className="container-post">
          <h4
            style={{
              fontWeight: 700,
              padding: 10,
            }}
          >
            Thông tin bài viết
          </h4>
          <div className="header-post">
            <div className="items-header-post">
              <Select
                showSearch
                style={{ width: 120 }}
                placeholder="Search to Select"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  (option?.label ?? "").includes(input)
                }
                filterSort={(optionA, optionB) =>
                  (optionA?.label ?? "")
                    .toLowerCase()
                    .localeCompare((optionB?.label ?? "").toLowerCase())
                }
                options={[
                  {
                    value: "1",
                    label: "Not Identified",
                  },
                  {
                    value: "2",
                    label: "Closed",
                  },
                  {
                    value: "3",
                    label: "Communicated",
                  },
                ]}
              />
            </div>
            <div className="items-header-post">
              <Space direction="vertical">
                <Search
                  placeholder="input search text"
                  onSearch={onSearch}
                  style={{ width: 950 }}
                />
              </Space>
            </div>
            <div className="items-header-post">
              <Space wrap>
                <Button
                  style={{ backgroundColor: "blue" }}
                  type="primary"
                  icon={<DownloadOutlined />}
                  size={size}
                >
                  Add Blog
                </Button>
              </Space>
            </div>
          </div>
        </div>
        <div className="table-list-blog">
          <div>
            <div style={{ marginBottom: 16 }}>
              {/* <Button
                type="primary"
                onClick={start}
                disabled={!hasSelected}
                loading={loading}
              >
                Reload
              </Button> */}
              <span style={{ marginLeft: 8 }}>
                {hasSelected ? `Selected ${selectedRowKeys.length} items` : ""}
              </span>
            </div>
            <Table
              rowSelection={rowSelection}
              columns={columns}
              dataSource={data}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default PostDashboard;
