"use client";
import { useState } from "react";
import { FcCancel } from "react-icons/fc";
import { MdSchedule } from "react-icons/md";
import IconWrapper from "./IconWrapper";
import Confirmation from "../Modals/Confirmation";
import { cancelOrder } from "@/utils/data";
import { useSession } from "next-auth/react";
import { User } from "next-auth";

interface IRowActionsOrdersProps {
  orderId: string;
}
const RowActionsOrders = (props: IRowActionsOrdersProps) => {
  const { data: session } = useSession();
  const userData = session?.user as any;
  //---------------------------------------------------------------//
  const [user, setUser] = useState<User>(userData?.data?.user);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  return (
    <>
      <div className="d-flex gap-3 align-items-center">
        <FcCancel size={18} onClick={() => setShowConfirmationModal(true)} />
        <MdSchedule size={18} />
      </div>
      <Confirmation
        showConfirmationModal={showConfirmationModal}
        setShowConfirmationModal={setShowConfirmationModal}
        text="Are you sure to cancel this order?"
        action={() => cancelOrder(props.orderId, user?.key?.auth_key)}
      />
    </>
  );
};

export default RowActionsOrders;
