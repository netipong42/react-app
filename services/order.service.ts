import apiNewService from "@/lib/apiNewService";
import { OrderCreate, OrderStatus } from "@/types/order";

export const OrderService = {
  async getOrders(pageNumber: number = 1, perPage: number = 5) {
    try {
      const res = await apiNewService.get(`/orders`, {
        params: {
          page: pageNumber,
          per_page: perPage,
        },
      });
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
