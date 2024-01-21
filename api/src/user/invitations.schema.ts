import { Prop, Schema } from "@nestjs/mongoose";
import { User } from "./user.schema";
import mongoose from "mongoose";
import { InvitationStatus } from "src/utils/const";


@Schema({timestamps: true})
export class Invitation {

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'User'})

    userSending: User;

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'User'})
    userReceiving: User;

    @Prop({required: true, enum: InvitationStatus, type: String})
    status: InvitationStatus
}