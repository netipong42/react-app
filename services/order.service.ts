import apiNewService from "@/lib/apiNewService";
import { OrderCreate, OrderStatus } from "@/types/order";

export const OrderService = {
  async getOrders(page: number = 1) {
    try {
      const res = await apiNewService.get(`/orders`);
      return res;
    } catch (error) {
      throw error;
    }
  },

  async findOrderById(id: string) {
    try {
      const res = await apiNewService.get(`/orders/${id}`);
      return res;
    } catch (error) {
      throw error;
    }
  },

  async createOrder(data: OrderCreate) {
    try {
      const res = await apiNewService.post(`/orders/`, data);
      return res;
    } catch (error) {
      throw error;
    }
  },

  async updateOrder(id: string, status: OrderStatus) {
    try {
      const res = await apiNewService.patch(`/orders/${id}/${status}`);
      return res;
    } catch (error) {
      throw error;
    }
  },
};
