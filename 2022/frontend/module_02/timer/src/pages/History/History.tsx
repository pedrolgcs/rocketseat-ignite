import React from 'react'
import { formatDistanceToNow } from 'date-fns'
import { useCycles } from '@/contexts'
import * as S from './History.styles'

const History: React.FC = () => {
  const { cycles } = useCycles()

  return (
    <S.HistoryContainer>
      <h1>Meu histórico</h1>

      <S.HistoryList>
        <table>
          <thead>
            <tr>
              <th>Tarefa</th>
              <th>Duração</th>
              <th>Início</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {cycles.map((cycle) => (
              <tr key={cycle.id}>
                <td>{cycle.task}</td>
                <td>{cycle.minutesAmount} minutos</td>
                <td>
                  {formatDistanceToNow(cycle.startedAt, {
                    addSuffix: true,
                  })}
                </td>
                <td>
                  {cycle.finishedDate && (
                    <S.Status statusColor="green">Concluído</S.Status>
                  )}

                  {cycle.interruptedDate && (
                    <S.Status statusColor="red">Interrompido</S.Status>
                  )}

                  {!cycle.finishedDate && !cycle.interruptedDate && (
                    <S.Status statusColor="yellow">Em andamento</S.Status>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </S.HistoryList>
    </S.HistoryContainer>
  )
}

export default History
