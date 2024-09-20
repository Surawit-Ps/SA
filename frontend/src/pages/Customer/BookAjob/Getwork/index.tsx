import { useState, useEffect } from "react";
import { Table, message, Spin, Button } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useParams, useNavigate } from "react-router-dom";
import { GetSubmissionsByWorkID, GetUserById, GetWorkById, GetWagesByWorkID } from "../../../../services/https/index"; // เพิ่ม GetWagesByWorkID
import { SubmissionInterface } from "../../../../interfaces/submission";
import { UsersInterface } from "../../../../interfaces/IUser";
import { WorkInterface } from "../../../../interfaces/work";

function ManageSubmissions() {
    const { workID } = useParams<{ workID: string }>();
    const [submissions, setSubmissions] = useState<SubmissionInterface[]>([]);
    const [users, setUsers] = useState<Record<number, UsersInterface>>({});
    const [works, setWorks] = useState<Record<number, WorkInterface>>({});
    const [wages, setWages] = useState<number | null>(null); // เก็บค่า wages
    const [loading, setLoading] = useState<boolean>(false);
    const [selectedSubmissions, setSelectedSubmissions] = useState<SubmissionInterface[]>([]);
    const [messageApi, contextHolder] = message.useMessage();
    const navigate = useNavigate();

    const columns: ColumnsType<SubmissionInterface> = [
        {
            title: "ID ผู้ใช้",
            dataIndex: "booker_user_id",
            key: "booker_user_id",
        },
        {
            title: "ชื่อผู้ใช้",
            key: "user_name",
            render: (record) => (
                <>
                    {users[record.booker_user_id]
                        ? `${users[record.booker_user_id].first_name} ${users[record.booker_user_id].last_name}`
                        : "ไม่ระบุ"}
                </>
            ),
        },
        {
            title: "ชื่องาน",
            key: "work_info",
            render: (record) => (
                <>
                    {works[record.work_id] ? works[record.work_id].info : "ไม่ระบุ"}
                </>
            ),
        },
        {
            title: "ไฟล์งาน",
            dataIndex: "file_link",
            key: "file_link",
        },
        {
            title: "ตรวจสอบงาน",
            key: "file_link_action",
            render: (record) => (
                record.file_link ? (
                    <a href={record.file_link} target="_blank" rel="noopener noreferrer">
                        ตรวจสอบงาน
                    </a>
                ) : (
                    "ไม่มีไฟล์"
                )
            ),
        },
    ];

    const handlePayment = () => {
        if (selectedSubmissions.length > 0) {
            const submission = selectedSubmissions[0]; // ใช้ submission แรกที่เลือก
            const { work_id, booker_user_id, poster_user_id, } = submission; // ดึงข้อมูลที่ต้องการ

            messageApi.open({
                type: "info",
                content: `กำลังนำไปสู่หน้าชำระเงินสำหรับงาน ID: ${work_id} โดยผู้ใช้ ID: ${booker_user_id} และค่าแรง: ${wages} บาท`, // เพิ่มการแสดงค่า wages
            });

            navigate('/payment', {
                state: {
                    workId: work_id,
                    bookerUserId: booker_user_id,
                    posterUserId: poster_user_id,
                    wagesId: wages_id,
                    wages, // ส่งค่า wages ไปด้วย
                }
            });
        } else {
            messageApi.open({
                type: "warning",
                content: "กรุณาเลือกการส่งงานอย่างน้อยหนึ่งรายการ",
            });
        }
    };

    const getUserById = async (userId: number) => {
        try {
            const res = await GetUserById(userId);
            if (res.status === 200) {
                setUsers(prevUsers => ({
                    ...prevUsers,
                    [userId]: res.data
                }));
            }
        } catch (error) {
            console.error(`Error fetching user ${userId}:`, error);
            messageApi.open({
                type: "error",
                content: `เกิดข้อผิดพลาดในการดึงข้อมูลผู้ใช้ ${userId}`,
            });
        }
    };

    const getWorkById = async (workId: number) => {
        try {
            const res = await GetWorkById(workId);
            if (res.status === 200) {
                setWorks(prevWorks => ({
                    ...prevWorks,
                    [workId]: res.data
                }));
            }
        } catch (error) {
            console.error(`Error fetching work ${workId}:`, error);
            messageApi.open({
                type: "error",
                content: `เกิดข้อผิดพลาดในการดึงข้อมูลงาน ${workId}`,
            });
        }
    };

    // เรียกฟังก์ชัน GetWagesByWorkID และเก็บค่า wages
    const getWages = async (workID: string) => {
        try {
            const res = await GetWagesByWorkID(workID);
            if (res.status === 200) {
                setWages(res.data.wages);
            } else {
                messageApi.open({
                    type: "error",
                    content: res.data.error || "เกิดข้อผิดพลาดในการดึงข้อมูลค่าแรง",
                });
            }
        } catch (error) {
            console.error("Error fetching wages:", error);
            messageApi.open({
                type: "error",
                content: "เกิดข้อผิดพลาดในการดึงข้อมูลค่าแรง",
            });
        }
    };

    const getSubmissions = async () => {
        if (workID) {
            setLoading(true);
            try {
                const res = await GetSubmissionsByWorkID(workID);
                if (res.status === 200) {
                    const submissionsData = res.data;
                    setSubmissions(submissionsData);

                    const userIds = Array.from(new Set(submissionsData.map(submission => submission.booker_user_id)));
                    const workIds = Array.from(new Set(submissionsData.map(submission => submission.work_id)));

                    // Fetch user and work data in parallel
                    await Promise.all([
                        ...userIds.map(userId => getUserById(userId)),
                        ...workIds.map(workId => getWorkById(workId)),
                    ]);

                    // เรียก GetWagesByWorkID เพื่อดึงค่า wages
                    await getWages(workID);
                } else {
                    setSubmissions([]);
                    messageApi.open({
                        type: "error",
                        content: res.data.error || "เกิดข้อผิดพลาดในการดึงข้อมูล",
                    });
                }
            } catch (error) {
                console.error("Error fetching submissions:", error);
                messageApi.open({
                    type: "error",
                    content: "เกิดข้อผิดพลาดในการดึงข้อมูล",
                });
            } finally {
                setLoading(false);
            }
        }
    };

    useEffect(() => {
        getSubmissions();
    }, [workID]);

    const rowSelection = {
        onChange: (selectedRowKeys: React.Key[], selectedRows: SubmissionInterface[]) => {
            setSelectedSubmissions(selectedRows);
        },
    };

    return (
        <>
            {contextHolder}
            <h2>จัดการการส่งงานสำหรับงาน ID: {workID}</h2>
            {loading ? (
                <Spin size="large" />
            ) : (
                <>
                    <Table
                        rowKey="id"
                        columns={columns}
                        dataSource={submissions}
                        rowSelection={rowSelection}
                        style={{ width: "100%", overflow: "scroll" }}
                    />
                    <Button
                        type="primary"
                        onClick={handlePayment}
                        disabled={selectedSubmissions.length === 0}
                        style={{ marginTop: '16px' }}
                    >
                        ชำระเงิน
                    </Button>
                </>
            )}
        </>
    );
}

export default ManageSubmissions;
